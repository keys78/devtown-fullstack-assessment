export const characterLimit = (text: any | undefined, limit: number) => {
  if (typeof text === 'undefined') {
    return undefined;
  }

  return text.length > limit ? text.substr(0, limit - 1).trim() + '...' : text;
};

export const tagOptions = [
  { value: '#tech', label: '#tech ~ World of the evolving technology' },
  { value: '#life', label: '#life ~ Life at its best' },
  { value: '#fun', label: '#fun ~ Riddle me that!' },
  { value: '#finance', label: "#finance ~ Its Money O'Clock" },
  { value: '#bix', label: '#bix ~ Business Times' },
];