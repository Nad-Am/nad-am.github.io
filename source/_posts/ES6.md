---
title: ES6
date: 2025-03-19 19:07:55
tags:
---
#### 函数

主要解决问题：**函数的二义性 ——————无法辨别函数是执行函数还是构造器/函数调用方式是直接调用还是new调用**

##### 1.解决调用方式判断

###### ES6之前：

- 判断是如何调用函数

  ```js
  var Person = function (name,age){
      this.name = name;
      this.age = age;
  }
  
  // 此时我们无法控制其调用方式
  var person = new Person('nadam',12);
  var funcPer = Person('nadam',12)	//如果这样被调用，可能会造成全局变量污染或其他问题
  
  //早期解决方法
  var Person = function (name,age){
      if(this instanceof Person){
          throw new Error("错误调用")
      }
      this.name = name;
      this.age = age;
  }
  
  //但是还是可以被绕过，通过绑定this
  
  var funcPre1 = Person.call(new Person,'nadam',11);
  ```

  

###### ES6：

- 使用new.target进行判断 ---- 该得到的是：

  - 函数没有使用new进行调用返回**undefined**

  - 函数使用new进行调用返回**new关键字后面的函数本身**

    ```js
    //所以之后编写
    var Person = function (name,age){
        if(!new.target){
            throw new Error("错误调用")
        }
        this.name = name;
        this.age = age;
    }
    ```



##### 2.辨别是执行函数or构造器

- ​	箭头函数：**解决函数二义性问题**
  - 首先说到函数就不得不提this指向问题
    1. 通过对象调用函数，this指向调用函数
    2. 直接调用函数，this指向全局
    3. 通过new调用函数，this指向新创建的对象实例
    4. 通过call，bin，apply调用函数，this指向指定的数据
    5. Dom事件函数，this指向事件源（即被注册事件的数据）

###### 1.箭头函数未出现之前

- ​	当使用Dom事件或者计时器相关事件时，会出现this指向问题

  ```js
  const obj = {
      count: 1,
      start:function (){
          setInterval(function(){
              this.count ++; 	
          })
      }
  }
  
  obj.start()	//此时调用start就会出现this指向问题，看似使用obj进行调用实际上在进入interval后this指向已经变为window
  
  
  //解决方式：
  const obj = {
      count: 1,
      start:function (){
  		const _this = this
          setInterval(function(){
              _this.count ++; 	
          })
      }
  }
  
  //使用一个中间变量用闭包进行存储正确的this   ---  但是一个方法及其麻烦
  ```

###### 2.箭头函数出现后：

- 箭头函数本质是函数表达式

- 箭头函数的this却决于**声明箭头函数的位置**  -----  更准确说法是箭头函数没有this arguments  new.target，但是他可以继承父级词法环境的这些数据，且一旦确定就无法改变

- 箭头函数没有原型，但是用隐式原型

- 使用场景：

  1. 临时性使用的函数，并不会刻意调用它，比如：
     1. 事件处理函数
     2. 异步处理函数
     3. 其他临时性函数
  2. 为了绑定外层this
  3. 在不影响其他代码的情况下，保持代码的简洁，最常见，数组方法中的回调函数

  ```js
  //此时书写
  
  const obj = {
      count: 1,
      start:function (){
          setInterval(() => {
              this.count ++; 	//这里的箭头函数this会继承外层函数的this，即start：function（）{}的this
          })
      }
      //注意  不能乱用箭头函数
      print:() =>{
          console.log(this.count)  //此时的this会出错指向全局，因为这里的this就相当于print：this的this指向
      }
  }
  ```