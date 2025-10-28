# JavaScript Snapshot Utility

A simple JavaScript utility for creating and managing snapshots of objects and data.

## Features

- Create deep clones of objects as snapshots
- Retrieve snapshots by ID
- List all available snapshots
- Compare snapshots
- Remove individual snapshots
- Clear all snapshots

## Installation

This is a standalone JavaScript file that can be included in your project.

## Usage

```javascript
const JSSnapshot = require('./index.js');

// Create a new snapshot utility instance
const snapshotUtil = new JSSnapshot();

// Create a snapshot of an object
const testData = {
  name: 'Test Object',
  value: 42,
  nested: {
    prop: 'value',
    array: [1, 2, 3]
  }
};

const snapshotId = snapshotUtil.createSnapshot(testData, 'my-snapshot');
console.log(`Created snapshot with ID: ${snapshotId}`);

// Modify original data
testData.value = 99;
testData.nested.prop = 'modified';

// Retrieve the snapshot (unchanged)
const retrievedSnapshot = snapshotUtil.getSnapshot('my-snapshot');
console.log('Original data after modification:', testData);
console.log('Retrieved snapshot:', retrievedSnapshot);

// List all snapshots
const allSnapshots = snapshotUtil.listSnapshots();
console.log('All snapshots:', allSnapshots);

// Compare two snapshots
const comparison = snapshotUtil.compareSnapshots('snapshot-1', 'snapshot-2');
console.log('Comparison result:', comparison);

// Remove a snapshot
snapshotUtil.removeSnapshot('my-snapshot');

// Clear all snapshots
snapshotUtil.clearAll();
```

## API

### `createSnapshot(data, name)`
Creates a snapshot of the provided data.
- `data`: The data to snapshot
- `name`: Optional name for the snapshot (if not provided, an auto-generated ID will be used)
- Returns: The snapshot ID

### `getSnapshot(snapshotId)`
Retrieves a snapshot by ID.
- `snapshotId`: The ID of the snapshot to retrieve
- Returns: The snapshot data or null if not found

### `listSnapshots()`
Lists all available snapshots.
- Returns: An array of snapshot information

### `removeSnapshot(snapshotId)`
Removes a snapshot by ID.
- `snapshotId`: The ID of the snapshot to remove
- Returns: Boolean indicating success

### `clearAll()`
Removes all snapshots.

### `compareSnapshots(snapshotId1, snapshotId2)`
Compares two snapshots.
- `snapshotId1`: First snapshot ID
- `snapshotId2`: Second snapshot ID
- Returns: Comparison result object

## License

MIT