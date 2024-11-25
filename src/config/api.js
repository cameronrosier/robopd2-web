import axios from 'axios';

const apiURL = 'http://192.168.2.206:30888';

export async function fetchItems(itemType, itemName) {
  const itemTypePath = itemType === 'unique' ? 'uniqueitems' : itemType === 'runeword' ? 'runeworditems' : itemType === 'rune' ? 'runes' : '';
  const url = `${apiURL}/${itemTypePath}/${itemName}`;
  const response = await axios.get(url);
  return response.data;
}
