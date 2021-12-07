# Class 文件结构
JVM 直接使用的是字节码，其文件形式就是 .class 文件。

例如编写一个示例类：
```
public class SimpleClassByteCodeTest {
    private int valueA = 3;

    protected long valueB = 1551L;

    public boolean valueC = true;

    Object valueD = new Object();

    private static double valueE = 3.14d;

    private double calculate(int paramF){
        int temp = 2;
        int valueG = temp + paramF + valueA;
        if(valueC){
            System.out.println(valueD.toString());
        }
        return valueE * valueG;
    }
}
```
使用 javac 编译后得到如图所示的字节码：

![image](https://user-images.githubusercontent.com/19852729/144962034-175c8248-5fa7-44f9-bfec-e6484583b618.png)

这个文件的内容结构在 JVM 规范中是有严格规范的，从头到尾的结构依次为：

![classfile](../../resource/java/classfileconstruct.drawio.png)

接下来对每个部分一一进行分析。

## 1. 魔数（Magic）
