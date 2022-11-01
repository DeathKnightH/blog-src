# attr 和 prop
## 1.历史由来
api 文档说明：

As of jQuery 1.6, the .attr() method returns undefined for attributes that have not been set. To retrieve and change DOM properties such as the checked, selected, or disabled state of form elements, use the .prop() method.

## 2.区别举例
|using|result|
|---|---|
|elem.checked	|true (Boolean) Will change with checkbox state|
|$( elem ).prop( "checked" )	|true (Boolean) Will change with checkbox state|
|elem.getAttribute( "checked" )	|"checked" (String) Initial state of the checkbox; does not change|
|$( elem ).attr( "checked" ) (1.6+)	|"checked" (String) Initial state of the checkbox; does not change|
|$( elem ).attr( "checked" ) (pre-1.6)	|true (Boolean) Changed with checkbox state|
