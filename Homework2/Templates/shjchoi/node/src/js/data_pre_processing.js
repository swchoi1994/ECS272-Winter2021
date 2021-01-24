export function data_cleaning(dataset,columns){
    let cleaned_dataset = [];
    for(let i = 0;i<dataset.length;i++){
      let appendable = true;
      for(let j=0;j<columns.length;j++){
        if(!dataset[i][columns[j]]){
          appendable = false;
          break;
        }
      }
      if(appendable){
        cleaned_dataset.push(dataset[i]);
      }
    }
    return cleaned_dataset;
  }

  export function data_pre_processing(dataset,columns){
    let parsed_dataset = JSON.parse(JSON.stringify(dataset));
    for(let i = 0;i < parsed_dataset.length; i++){
      for(const property in parsed_dataset[i]){
        if(!columns.includes(property)){
          delete parsed_dataset[i][property]
        }
      }
    }
    return parsed_dataset;      
  }