// Palette seeds (IDs 01–12) with placeholder hex swatches
export const PALETTES = [
  { id: '01', name: 'Sunlit Linen', swatches: ['#F3E7D3','#EAD9C0','#CDAE7D','#8C6B49','#3C5D7C','#0F2A52'] },
  { id: '02', name: 'Golden Hour', swatches: ['#F7E2B5','#E9C77E','#C99B3A','#7A5B2E','#3C5D7C','#15202B'] },
  { id: '03', name: 'Clear Morning', swatches: ['#E6F1FA','#B8D8F0','#7CA9D6','#3C5D7C','#0F2A52','#15202B'] },
  { id: '04', name: 'Soft Cloud', swatches: ['#F5F2EC','#E9E3D7','#CDBDA8','#8B8F98','#5F6773','#1B2430'] },
  { id: '05', name: 'Coastal', swatches: ['#E1EFF1','#A7D4DC','#73CBBE','#3C5D7C','#0F2A52','#15202B'] },
  { id: '06', name: 'Sage', swatches: ['#E2EFE6','#C7E0CF','#9DC9AE','#5E8B73','#3C5D7C','#15202B'] },
  { id: '07', name: 'Warm Meadow', swatches: ['#F6F0E6','#EADFBF','#D2C89F','#8C6B49','#3C5D7C','#0F2A52'] },
  { id: '08', name: 'Olive Terrace', swatches: ['#EDEBE1','#D9D5C1','#B9B48F','#807C59','#3C5D7C','#0F2A52'] },
  { id: '09', name: 'Granite Blue', swatches: ['#EAF0F7','#CBD7E6','#94A9C2','#526A85','#2E3E53','#15202B'] },
  { id: '10', name: 'Indigo Evening', swatches: ['#EDEDF4','#C7C9E6','#8B90C8','#4B4F9A','#20255F','#0F2A52'] },
  { id: '11', name: 'Soft Navy', swatches: ['#F0F3F6','#D7DFE7','#A8B8C8','#6A7E93','#3C5D7C','#0F2A52'] },
  { id: '12', name: 'Electric City', swatches: ['#F6F0E6','#F1C646','#EB6157','#73CBBE','#0F2A52','#15202B'] },
]

export function getPaletteById(id) {
  return PALETTES.find(p => p.id === id) || PALETTES[0]
}


