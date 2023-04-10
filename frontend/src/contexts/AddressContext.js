import {createContext} from 'react';

const AddressContext = createContext({
  address: '',
  details: null,
  location: null,
  place_id: '',
  setAddressData: () => {},
});
export default AddressContext;
