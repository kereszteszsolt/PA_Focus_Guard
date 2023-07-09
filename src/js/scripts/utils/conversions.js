export function convertHashToPascalCase(hash) {
    // Convert the hash to PascalCase (e.g. #temporarily-blocked-sites -> TemporarilyBlockedSites
    return hash.replace('#', '').replace(/-(\w)/g, (_, c) => c.toUpperCase()).replace(/\b(\w)/g, c => c.toUpperCase());
}
export function convertPascalCaseToHash(pascalCase) {
    const dashedString = pascalCase
        .replace(/([a-z])([A-Z])/g, '$1-$2') // Insert a dash before each uppercase letter
        .toLowerCase(); // Convert the string to lowercase
    return `#${dashedString}`;
}
