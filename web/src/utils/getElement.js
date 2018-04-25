function GetElement() {
   document.addEventListener('DOMContentLoaded',()=>{
      this.width = 'hola';
      console.log(this);
   });
}
//example object method
GetElement.prototype.getElement = function(el) {
   return this[el];
};

export { GetElement };
