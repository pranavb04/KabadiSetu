import * as lucide from 'lucide';

export function createLucideIcon(iconName, options = {}) {
  const size = options.size || 20;
  const color = options.color || 'currentColor';
  const className = options.className || '';

  // Get icon definition from Lucide library
  const kebabName = iconName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  
  // Find icon in lucide object (Lucide exports PascalCase keys like 'Camera', 'PlusCircle', 'CheckCircle2')
  const pascalKey = iconName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
    
  const camelKey = iconName.replace(/-([a-z])/g, g => g[1].toUpperCase());
  const iconDef = lucide[pascalKey] || lucide[iconName] || lucide[camelKey];

  if (!iconDef) {
    console.warn(`[createLucideIcon] Icon "${iconName}" not found.`);
    return '';
  }

  // Create SVG element string
  const svgContent = iconDef.map(([tag, attrs]) => {
    const attrStr = Object.entries(attrs)
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ');
    return `<${tag} ${attrStr}></${tag}>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${kebabName} ${className}">${svgContent}</svg>`;
}
