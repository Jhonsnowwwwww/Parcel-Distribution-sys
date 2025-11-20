# Technical Assessment

## Short Description
As an employee of a parcel delivery company, you are tasked with designing a system to automate the handling of incoming parcels at the distribution center. This system must categorize parcels for processing by various departments, according to their weight and value. Given the dynamic nature of the business, the system should be adaptable to future changes, such as the potential addition or removal of departments.

## Features

### Feature 1: Departmental Handling Based on Weight
The system should follow these current business rules for parcel distribution:
- Parcels weighing up to 1 kg are directed to the "Mail" department.
- Parcels weighing up to 10 kg are directed to the "Regular" department.
- Parcels weighing over 10 kg are directed to the "Heavy" department.

### Feature 2: High-Value Parcel Processing
Any parcel valued over €1,000 must receive approval from the "Insurance" department prior to processing by the relevant weight-based department.

### Feature 3 (Optional): Software Productization
In response to business opportunities, there is an option to package the software for sale under a license subscription model. This would require the business rules to be customizable to accommodate the needs of different customers.

## Exercise
Your tasks include:
- Parsing the XML file named `Container_68465468.xml`.
- Developing a functional application using a programming language and frameworks of your choice (subject to agreement).
- Writing unit tests to ensure reliability.
- Creating a presentation that may include a UI or console application demonstration.

## During the Technical Interview
You will be expected to:
- Demonstrate the application's functionality.
- Explain how the system can be adapted to add or remove departments, showcasing its flexibility.
