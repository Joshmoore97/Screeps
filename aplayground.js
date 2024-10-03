function assignHaulerToContainer(hauler) {
    let containers = getContainersNearFlags(["Energy1", "Energy2"]);
    let bestContainer = null;
    let shortestDistance = Infinity;

    for (let container of containers) {
        if (container.store[RESOURCE_ENERGY] >= hauler.carryCapacity && !container.reserved) {
            let distance = calculateDistance(hauler.pos, container.pos);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                bestContainer = container;
            }
        }
    }

    if (bestContainer) {
        bestContainer.reserved = true;
        hauler.memory.targetContainer = bestContainer.id;
    }
}

function haulerLogic(hauler) {
    if (!hauler.memory.targetContainer) {
        assignHaulerToContainer(hauler);
    }

    let targetContainer = Game.getObjectById(hauler.memory.targetContainer);

    if (targetContainer && targetContainer.store[RESOURCE_ENERGY] >= hauler.carryCapacity) {
        if (hauler.withdraw(targetContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            hauler.moveTo(targetContainer);
        }
    } else {
        // Container is empty or has insufficient energy, reassign
        delete hauler.memory.targetContainer;
        targetContainer.reserved = false;
    }
}