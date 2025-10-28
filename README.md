# Java快照管理器

这是一个Java快照管理器，用于创建、存储和管理对象快照。该工具允许您在特定时间点保存对象的状态，并在需要时检索这些状态。

## 功能特性

- 创建对象快照
- 通过ID检索快照
- 列出所有快照ID
- 比较快照差异
- 删除特定快照
- 清空所有快照
- 线程安全的快照存储

## 使用方法

### 创建快照管理器

```java
SnapshotManager<Map<String, Object>> manager = new SnapshotManager<>();
```

### 创建快照

```java
Map<String, Object> data = new HashMap<>();
data.put("name", "John");
data.put("age", 30);

String snapshotId = manager.createSnapshot(data);
```

### 获取快照

```java
Map<String, Object> snapshot = manager.getSnapshot(snapshotId);
```

### 比较快照

```java
boolean areEqual = manager.compareSnapshots(id1, id2);
```

### 删除快照

```java
manager.deleteSnapshot(snapshotId);
```

### 列出所有快照

```java
List<String> snapshotIds = manager.listSnapshots();
```

### 清空所有快照

```java
manager.clearAllSnapshots();
```

## 实现细节

- 使用`ConcurrentHashMap`确保线程安全
- 使用序列化实现对象的深拷贝，确保快照独立性
- 快照ID自动生成，格式为"snapshot_0", "snapshot_1"等

## 测试

项目包含完整的测试用例，测试了基本功能和自定义对象的处理。
