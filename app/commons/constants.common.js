class Constants {
  
  constructor() {
    this.success      = "success";
    this.err          = "error";
    this.dataNotFound = "Data not found";
    this.deleteSuccess     =  "Delete success" 
  }

  Invalid(val) {
    return `Invalid ${val} format`;
  }

  Require(val) {
    return `${val} required`;
  }
}

module.exports = Constants;
