gson
Gson.fromJson 默认不是严格模式，会忽略字符串中的一些格式错误，甚至手动设置 JsonReader.setLenient(false) 也没有用。
需要调用 Gson.getAdapter(type).fromJson(gson.newJsonReader(input)) 才能以严格规则转换 json 字符串。
