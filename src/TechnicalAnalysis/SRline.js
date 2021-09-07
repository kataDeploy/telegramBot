export function SupLine (arr,chunk,perc,strLevel) {
    let minValsOfSegArr = minValuesOfSegmentedArr();
    let minValOfSegArr = null;
    let supportArr = null;
    const minMean = [];
    while(minValsOfSegArr.length>0){
        minValOfSegArr = findMinValueOfSegmentedArr();
        supportArr = findCloseRangeOfMin();
        const mean = calcMean(supportArr);
        if(supportArr.length>strLevel){
            minMean.push({mean,strength:supportArr.length});
        }
        removeSupFromMinVals();
    }

    return minMean;
    function segmented2DArr(){
        let i,j;
        const segmentedArr = [];
        for (i=0,j=arr.length; i<j; i+=chunk) {
            segmentedArr.push(arr.slice(i,i+chunk));
        }
        return segmentedArr;
    }
    
    function minValuesOfSegmentedArr(){
        const segArr = segmented2DArr();
        const minVals = [];
        for (let i = 0; i < segArr.length; i++) {
            const el = findMinValue(segArr[i]);
            minVals.push(el);
        }
        return minVals;
    }
  
    function findCloseRangeOfMin(){
        const closeArr = [];
        minValsOfSegArr.forEach(el => {
            if(findPercentageDif(el,minValOfSegArr)<perc 
                && findPercentageDif(el,minValOfSegArr)>-perc){
                    closeArr.push(el);
            }
        })
        return closeArr;
    }
   
    function calcMean(array) {
        return array.reduce((a, b) => a + b) / array.length;
    }

    function removeSupFromMinVals () {
        minValsOfSegArr = minValsOfSegArr.filter(el => !supportArr.includes(el) );
    }
  
    function findMinValueOfSegmentedArr(){
        return Math.min(...minValsOfSegArr); 
    }

    function findPercentageDif(initVal, lastVal){
        const dif = initVal-lastVal;
        const perc = parseFloat(dif/initVal)*100;
        return perc;
    }
    function findMinValue(data){
        return Math.min(...data); 
    }
   
}
export function ResLine (arr,chunk,perc,strLevel) {
    let maxValsOfSegArr = maxValuesOfSegmentedArr();
    let maxValOfSegArr = null;
    let supportMaxArr = null;
    const maxMean = [];
    while(maxValsOfSegArr.length>0){
        maxValOfSegArr = findMaxValueOfSegmentedArr();
        supportMaxArr = findCloseRangeOfMax();
        const mean = calcMean(supportMaxArr);
        if(supportMaxArr.length>strLevel){
            maxMean.push({mean,strength:supportMaxArr.length});
        }
        removeSupFromMaxVals();
    }
    return maxMean;
    function segmented2DArr(){
        let i,j;
        const segmentedArr = [];
        for (i=0,j=arr.length; i<j; i+=chunk) {
            segmentedArr.push(arr.slice(i,i+chunk));
        }
        return segmentedArr;
    }
    
    
    function maxValuesOfSegmentedArr(){
        const segArr = segmented2DArr();
        const minVals = [];
        for (let i = 0; i < segArr.length; i++) {
            const el = findMaxValue(segArr[i]);
            minVals.push(el);
        }
        return minVals;
    }
    
  
    function findCloseRangeOfMax(){
        const closeArr = [];
        maxValsOfSegArr.forEach(el => {
            if(findPercentageDif(el,maxValOfSegArr)<perc 
                && findPercentageDif(el,maxValOfSegArr)>-perc){
                    closeArr.push(el);
            }
        })
        return closeArr;
    }

    function calcMean(array) {
        return array.reduce((a, b) => a + b) / array.length;
    }

  
    function removeSupFromMaxVals () {
        maxValsOfSegArr = maxValsOfSegArr.filter(el => !supportMaxArr.includes(el) );
    }
   
    function findMaxValueOfSegmentedArr(){
        return Math.max(...maxValsOfSegArr); 
    }

    function findPercentageDif(initVal, lastVal){
        const dif = initVal-lastVal;
        const perc = parseFloat(dif/initVal)*100;
        return perc;
    }
   
    function findMaxValue(data){
        return Math.max(...data);
    }
}



