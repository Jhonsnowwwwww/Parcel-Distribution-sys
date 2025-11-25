// backend/src/services/xmlParserService.js
const xml2js = require('xml2js');
const parcelService = require('./parcelService');

class XMLParserService {
  async parseAndProcessXML(xmlData) {
    try {
      console.log('📦 Parsing XML data...');
      const parcels = await this.parseXML(xmlData);
      console.log(`✅ Parsed ${parcels.length} parcels from XML`);
      
      const results = [];

      for (const parcel of parcels) {
        console.log('Processing parcel:', parcel);
        const result = await parcelService.processParcel(parcel);
        results.push(result);
      }

      return results;
    } catch (error) {
      console.error('❌ XML processing failed:', error);
      throw new Error(`XML processing failed: ${error.message}`);
    }
  }

  parseXML(xmlData) {
    return new Promise((resolve, reject) => {
      const parser = new xml2js.Parser({
        explicitArray: false,
        mergeAttrs: true,
        normalize: true,
        trim: true
      });

      parser.parseString(xmlData, (err, result) => {
        if (err) {
          console.error('XML parsing error:', err);
          reject(new Error(`XML parsing error: ${err.message}`));
        } else {
          console.log('Raw XML parse result:', JSON.stringify(result, null, 2).substring(0, 500));
          try {
            const parcels = this.transformXMLToParcels(result);
            resolve(parcels);
          } catch (transformError) {
            reject(new Error(`XML transformation error: ${transformError.message}`));
          }
        }
      });
    });
  }

  transformXMLToParcels(xmlData) {
    console.log('🔄 Transforming XML structure...');
    
    // Handle both Container and container, parcels and Parcel variations
    const container = xmlData.Container || xmlData.container;
    if (!container) {
      console.error('No container found in XML');
      return [];
    }

    const parcelsData = container.parcels || container.Parcels;
    if (!parcelsData) {
      console.error('No parcels found in container');
      return [];
    }

    // Handle both Parcel and parcel (case variations)
    let rawParcels = [];
    if (parcelsData.Parcel) {
      rawParcels = Array.isArray(parcelsData.Parcel) ? parcelsData.Parcel : [parcelsData.Parcel];
    } else if (parcelsData.parcel) {
      rawParcels = Array.isArray(parcelsData.parcel) ? parcelsData.parcel : [parcelsData.parcel];
    } else {
      console.error('No parcel elements found');
      return [];
    }

    console.log(`Found ${rawParcels.length} raw parcel elements`);

    const parcels = rawParcels.map((parcel, index) => {
      try {
        // Extract weight and value (handle case variations)
        const weight = parseFloat(parcel.Weight || parcel.weight || 0);
        const value = parseFloat(parcel.Value || parcel.value || 0);
        
        // Extract recipient information
        const recipientData = parcel.Receipient || parcel.Receipt || parcel.recipient;
        let recipientName = 'Unknown Recipient';
        let city = 'Unknown City';

        if (recipientData) {
          recipientName = recipientData.Name || recipientData.name || 'Unknown Recipient';
          if (recipientData.Address || recipientData.address) {
            const address = recipientData.Address || recipientData.address;
            city = address.City || address.city || 'Unknown City';
          }
        }

        console.log(`Parcel ${index + 1}:`, { weight, value, recipientName, city });

        if (isNaN(weight) || isNaN(value)) {
          console.warn(`Invalid data in parcel ${index + 1}:`, parcel);
        }

        return {
          weight: isNaN(weight) ? 0 : weight,
          value: isNaN(value) ? 0 : value,
          recipient: recipientName,
          destination: city
        };
      } catch (error) {
        console.error(`Error processing parcel ${index + 1}:`, error, parcel);
        return {
          weight: 0,
          value: 0,
          recipient: 'Error Processing',
          destination: 'Unknown'
        };
      }
    }).filter(parcel => parcel.weight > 0); // Filter out invalid parcels

    console.log(`✅ Successfully transformed ${parcels.length} parcels`);
    return parcels;
  }
}

module.exports = new XMLParserService();