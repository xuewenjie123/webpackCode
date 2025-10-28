import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Java快照管理器
 * 用于创建、存储和管理对象快照
 */
public class SnapshotManager<T> {
    private final Map<String, T> snapshots;
    private final String snapshotPrefix;
    private int counter;

    /**
     * 构造函数
     */
    public SnapshotManager() {
        this.snapshots = new ConcurrentHashMap<>();
        this.snapshotPrefix = "snapshot_";
        this.counter = 0;
    }

    /**
     * 创建快照
     * @param obj 要创建快照的对象
     * @return 快照ID
     */
    public String createSnapshot(T obj) {
        String id = snapshotPrefix + counter++;
        // 使用序列化深拷贝创建快照
        T clonedObj = deepClone(obj);
        snapshots.put(id, clonedObj);
        return id;
    }

    /**
     * 获取快照
     * @param id 快照ID
     * @return 快照对象
     */
    public T getSnapshot(String id) {
        return snapshots.get(id);
    }

    /**
     * 删除快照
     * @param id 快照ID
     */
    public void deleteSnapshot(String id) {
        snapshots.remove(id);
    }

    /**
     * 列出所有快照ID
     * @return 快照ID列表
     */
    public List<String> listSnapshots() {
        return new ArrayList<>(snapshots.keySet());
    }

    /**
     * 清空所有快照
     */
    public void clearAllSnapshots() {
        snapshots.clear();
    }

    /**
     * 深拷贝对象
     * @param obj 原对象
     * @return 深拷贝后的对象
     */
    @SuppressWarnings("unchecked")
    private T deepClone(T obj) {
        if (obj == null) {
            return null;
        }
        
        try {
            // 使用序列化实现深拷贝
            java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream();
            java.io.ObjectOutputStream oos = new java.io.ObjectOutputStream(baos);
            oos.writeObject(obj);
            oos.close();
            
            java.io.ByteArrayInputStream bais = new java.io.ByteArrayInputStream(baos.toByteArray());
            java.io.ObjectInputStream ois = new java.io.ObjectInputStream(bais);
            T clonedObj = (T) ois.readObject();
            ois.close();
            
            return clonedObj;
        } catch (Exception e) {
            System.err.println("深拷贝失败: " + e.getMessage());
            return obj; // 如果深拷贝失败，返回原对象（浅拷贝）
        }
    }

    /**
     * 比较两个快照
     * @param id1 第一个快照ID
     * @param id2 第二个快照ID
     * @return 比较结果
     */
    public boolean compareSnapshots(String id1, String id2) {
        T obj1 = getSnapshot(id1);
        T obj2 = getSnapshot(id2);
        
        if (obj1 == null && obj2 == null) {
            return true;
        }
        if (obj1 == null || obj2 == null) {
            return false;
        }
        
        return obj1.equals(obj2);
    }
}