export const DEPARTMENT_COLORS = {
  Mail: 'blue',
  Regular: 'green',
  Heavy: 'orange',
  Insurance: 'red'
};

export const DEPARTMENT_RULES = {
  Mail: 'Weight <= 1 kg',
  Regular: 'Weight > 1 kg AND Weight <= 10 kg',
  Heavy: 'Weight > 10 kg',
  Insurance: 'Value >= 1000 €'
};

export const SAMPLE_PARCELS = [
  {
    weight: 0.5,
    value: 50,
    recipient: 'John Doe',
    destination: 'New York, USA'
  },
  {
    weight: 5,
    value: 1500,
    recipient: 'Jane Smith',
    destination: 'London, UK'
  },
  {
    weight: 15,
    value: 800,
    recipient: 'Bob Johnson',
    destination: 'Tokyo, Japan'
  }
];