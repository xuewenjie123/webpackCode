/**
 * Test file for JavaScript Snapshot Utility
 */

const JSSnapshot = require('./index.js');

// Create a new snapshot utility instance
const snapshotUtil = new JSSnapshot();

console.log('Testing JavaScript Snapshot Utility...\n');

// Test 1: Creating and retrieving a simple object snapshot
console.log('Test 1: Creating and retrieving a simple object snapshot');
const testData1 = {
  name: 'Test Object 1',
  value: 42,
  array: [1, 2, 3, 4]
};

const snapshotId1 = snapshotUtil.createSnapshot(testData1, 'test-object-1');
console.log(`Created snapshot with ID: ${snapshotId1}`);

// Modify original data
testData1.value = 99;
testData1.array.push(5);

// Retrieve the snapshot (should be unchanged)
const retrievedSnapshot1 = snapshotUtil.getSnapshot('test-object-1');
console.log('Original data after modification:', testData1);
console.log('Retrieved snapshot:', retrievedSnapshot1);
console.log('');

// Test 2: Creating multiple snapshots
console.log('Test 2: Creating multiple snapshots');
const snapshotId2 = snapshotUtil.createSnapshot({ id: 2, data: 'snapshot 2' }, 'test-object-2');
const snapshotId3 = snapshotUtil.createSnapshot({ id: 3, data: 'snapshot 3' }, 'test-object-3');

console.log(`Created snapshots: ${snapshotId2}, ${snapshotId3}`);
console.log('');

// Test 3: Listing all snapshots
console.log('Test 3: Listing all snapshots');
const allSnapshots = snapshotUtil.listSnapshots();
console.log('All snapshots:', allSnapshots);
console.log('');

// Test 4: Comparing snapshots
console.log('Test 4: Comparing snapshots');
const comparison = snapshotUtil.compareSnapshots('test-object-1', 'test-object-2');
console.log('Comparison result:', comparison);
console.log('');

// Test 5: Removing a snapshot
console.log('Test 5: Removing a snapshot');
const removed = snapshotUtil.removeSnapshot('test-object-2');
console.log(`Removed snapshot 'test-object-2': ${removed}`);

const snapshotsAfterRemoval = snapshotUtil.listSnapshots();
console.log('Snapshots after removal:', snapshotsAfterRemoval.length, 'snapshots remaining');
console.log('');

// Test 6: Clearing all snapshots
console.log('Test 6: Clearing all snapshots');
snapshotUtil.clearAll();
const snapshotsAfterClear = snapshotUtil.listSnapshots();
console.log('Snapshots after clearing all:', snapshotsAfterClear.length, 'snapshots remaining');

console.log('\nAll tests completed!');