/**
 * JavaScript Snapshot Utility
 * Provides functionality to create snapshots of objects/data
 */

class JSSnapshot {
  constructor() {
    this.snapshots = new Map();
    this.counter = 0;
  }

  /**
   * Creates a deep clone of an object
   * @param {*} obj - Object to clone
   * @returns {*} Deep clone of the object
   */
  deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }

    if (obj instanceof Array) {
      return obj.map(item => this.deepClone(item));
    }

    if (typeof obj === 'object') {
      const clonedObj = {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = this.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }

    return obj;
  }

  /**
   * Creates a snapshot of the provided data
   * @param {*} data - Data to snapshot
   * @param {string} name - Optional name for the snapshot
   * @returns {string} Snapshot ID
   */
  createSnapshot(data, name = null) {
    const snapshotId = name || `snapshot_${++this.counter}`;
    const clonedData = this.deepClone(data);
    
    this.snapshots.set(snapshotId, {
      data: clonedData,
      timestamp: new Date(),
      id: snapshotId
    });
    
    return snapshotId;
  }

  /**
   * Retrieves a snapshot by ID
   * @param {string} snapshotId - ID of the snapshot
   * @returns {*} The snapshot data
   */
  getSnapshot(snapshotId) {
    const snapshot = this.snapshots.get(snapshotId);
    return snapshot ? this.deepClone(snapshot.data) : null;
  }

  /**
   * Lists all available snapshots
   * @returns {Array} Array of snapshot information
   */
  listSnapshots() {
    const snapshots = [];
    for (let [id, snapshot] of this.snapshots) {
      snapshots.push({
        id: id,
        timestamp: snapshot.timestamp,
        data: this.deepClone(snapshot.data)
      });
    }
    return snapshots;
  }

  /**
   * Removes a snapshot
   * @param {string} snapshotId - ID of the snapshot to remove
   * @returns {boolean} Whether the snapshot was removed
   */
  removeSnapshot(snapshotId) {
    return this.snapshots.delete(snapshotId);
  }

  /**
   * Clears all snapshots
   */
  clearAll() {
    this.snapshots.clear();
    this.counter = 0;
  }

  /**
   * Compares two snapshots
   * @param {string} snapshotId1 - First snapshot ID
   * @param {string} snapshotId2 - Second snapshot ID
   * @returns {Object} Comparison result
   */
  compareSnapshots(snapshotId1, snapshotId2) {
    const snap1 = this.getSnapshot(snapshotId1);
    const snap2 = this.getSnapshot(snapshotId2);

    if (!snap1 || !snap2) {
      return { error: 'One or both snapshots not found' };
    }

    // Simple comparison - in a real implementation you might want more detailed diffing
    const isEqual = JSON.stringify(snap1) === JSON.stringify(snap2);
    
    return {
      isEqual,
      snapshot1: snap1,
      snapshot2: snap2
    };
  }
}

// Example usage
if (require.main === module) {
  const snapshotUtil = new JSSnapshot();
  
  // Create some test data
  const testData = {
    name: 'Test Object',
    value: 42,
    nested: {
      prop: 'value',
      array: [1, 2, 3]
    },
    date: new Date()
  };
  
  // Create a snapshot
  const snapshotId = snapshotUtil.createSnapshot(testData, 'test-data');
  console.log(`Created snapshot with ID: ${snapshotId}`);
  
  // Modify original data
  testData.value = 99;
  testData.nested.prop = 'modified';
  
  // Retrieve the snapshot (unchanged)
  const retrievedSnapshot = snapshotUtil.getSnapshot('test-data');
  console.log('Original data after modification:', testData);
  console.log('Retrieved snapshot:', retrievedSnapshot);
  
  // List all snapshots
  console.log('All snapshots:', snapshotUtil.listSnapshots());
}

module.exports = JSSnapshot;