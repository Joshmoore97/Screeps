const fs = require('fs/promises');
const path = require('path');

const BODYPART_COST = {
    "move": 50,
    "work": 100,
    "attack": 80,
    "carry": 50,
    "heal": 250,
    "ranged_attack": 150,
    "tough": 10,
    "claim": 600
};

async function countBodyPartsAndCalculateCost(directory) {
    let totalCost = 0;
    let totalBodyPartCounts = {};
    let fileResults = {};

    try {
        console.log('Scanning directory:', directory);
        const files = await fs.readdir(directory);
        console.log('Files found:', files);
        
        for (const file of files) {
            if (file.startsWith('spawn.') && file.endsWith('.js')) {
                console.log('Processing file:', file);
                const filePath = path.join(directory, file);
                const content = await fs.readFile(filePath, 'utf8');
                
                let fileBodyPartCounts = {};
                let fileCost = 0;

                const lines = content.split('\n');
                lines.forEach((line, index) => {
                    if (line.includes('spawn.spawnCreep')) {
                        console.log(`Found spawn.spawnCreep in ${file} on line ${index + 1}`);
                        const match = line.match(/\[(.*?)\]/);
                        if (match) {
                            const bodyParts = match[1].split(',').map(part => part.trim().replace(/['"]/g, ''));
                            console.log('Body parts found:', bodyParts);
                            
                            bodyParts.forEach(part => {
                                const lowerPart = part.toLowerCase();
                                if (BODYPART_COST.hasOwnProperty(lowerPart)) {
                                    fileBodyPartCounts[lowerPart] = (fileBodyPartCounts[lowerPart] || 0) + 1;
                                    totalBodyPartCounts[lowerPart] = (totalBodyPartCounts[lowerPart] || 0) + 1;
                                    fileCost += BODYPART_COST[lowerPart];
                                    totalCost += BODYPART_COST[lowerPart];
                                } else {
                                    console.log(`Unknown body part: ${part}`);
                                }
                            });
                        } else {
                            console.log('No body parts found in the line');
                        }
                    }
                });

                fileResults[file] = {
                    bodyPartCounts: fileBodyPartCounts,
                    cost: fileCost
                };
            } else {
                console.log('Skipping file:', file);
            }
        }

        return { fileResults, totalBodyPartCounts, totalCost };
    } catch (error) {
        console.error('Error:', error);
        return { fileResults: {}, totalBodyPartCounts: {}, totalCost: 0 };
    }
}

async function main() {
    const directory = 'C:\\Users\\ox_jo\\AppData\\Local\\Screeps\\scripts\\screeps.com\\default\\';
    console.log('Starting analysis of directory:', directory);
    const result = await countBodyPartsAndCalculateCost(directory);
    
    console.log('\nResults per file:');
    for (const [file, data] of Object.entries(result.fileResults)) {
        console.log(`\nFile: ${file}`);
        console.log('Body Part Counts:', data.bodyPartCounts);
        console.log('Total Cost:', data.cost);
    }

    console.log('\nOverall Summary:');
    console.log('Total Body Part Counts:', result.totalBodyPartCounts);
    console.log('Total Cost Across All Files:', result.totalCost);
}

main();