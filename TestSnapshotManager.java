import java.util.*;

/**
 * 测试类，用于测试SnapshotManager的功能
 */
public class TestSnapshotManager {
    public static void main(String[] args) {
        // 创建快照管理器
        SnapshotManager<Map<String, Object>> manager = new SnapshotManager<>();
        
        // 创建测试数据
        Map<String, Object> data1 = new HashMap<>();
        data1.put("name", "John");
        data1.put("age", 30);
        data1.put("city", "New York");
        
        // 创建第一个快照
        String id1 = manager.createSnapshot(data1);
        System.out.println("创建快照1，ID: " + id1);
        
        // 修改原始数据
        data1.put("age", 31);
        data1.put("country", "USA");
        
        // 创建第二个快照
        String id2 = manager.createSnapshot(data1);
        System.out.println("创建快照2，ID: " + id2);
        
        // 获取快照
        Map<String, Object> snapshot1 = manager.getSnapshot(id1);
        Map<String, Object> snapshot2 = manager.getSnapshot(id2);
        
        System.out.println("快照1: " + snapshot1);
        System.out.println("快照2: " + snapshot2);
        
        // 比较快照
        boolean areEqual = manager.compareSnapshots(id1, id2);
        System.out.println("快照1和快照2是否相等: " + areEqual);
        
        // 列出所有快照
        List<String> snapshotIds = manager.listSnapshots();
        System.out.println("所有快照ID: " + snapshotIds);
        
        // 删除快照
        manager.deleteSnapshot(id1);
        System.out.println("删除快照1后，剩余快照ID: " + manager.listSnapshots());
        
        // 清空所有快照
        manager.clearAllSnapshots();
        System.out.println("清空所有快照后，剩余快照ID: " + manager.listSnapshots());
        
        // 测试自定义对象
        testCustomObject();
    }
    
    /**
     * 测试自定义对象
     */
    static void testCustomObject() {
        System.out.println("\n--- 测试自定义对象 ---");
        SnapshotManager<Person> personManager = new SnapshotManager<>();
        
        Person person = new Person("Alice", 25);
        String personId = personManager.createSnapshot(person);
        System.out.println("创建人员快照，ID: " + personId);
        
        Person retrievedPerson = personManager.getSnapshot(personId);
        System.out.println("检索的人员: " + retrievedPerson);
        
        // 修改原对象
        person.setAge(26);
        
        // 再次检索快照中的对象，应该保持不变
        Person snapshotPerson = personManager.getSnapshot(personId);
        System.out.println("修改原对象后，快照中的人员: " + snapshotPerson);
    }
}

/**
 * 用于测试的自定义对象
 */
class Person implements java.io.Serializable {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public void setAge(int age) {
        this.age = age;
    }
    
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age && Objects.equals(name, person.name);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}