({
    setQuestionDeck : function(component, event, helper){
     var allQuestionDeckWithQuestions = component.get("v.allQuestionDeckWithQuestions");
    // console.log("#### allQuestionDeckWithQuestions 1length = "+ allQuestionDeckWithQuestions.length);
     var weekName = component.get("v.weekName");
     var questionDeck;
     for (var i = 0; i < allQuestionDeckWithQuestions.length; i++) {
        // console.log("### 1 weekName = "+ weekName);  
        // console.log("### 1 allQuestionDeckWithQuestions[i].Week__c = "+ allQuestionDeckWithQuestions[i].Week__c);           
         if(weekName == allQuestionDeckWithQuestions[i].Week__c){
             //console.log("### heroMap = "+ JSON.stringify(heroMap));
             component.set("v.questionDeck", allQuestionDeckWithQuestions[i]);
             questionDeck = allQuestionDeckWithQuestions[i];
         }

     }
    // console.log("### questionDeck 12 = "+ JSON.stringify(questionDeck));
     if(undefined != questionDeck){
         helper.getRandomQuestion(component, questionDeck);
     }
 },

 getRandomQuestion : function(component,questionDeck){
     //console.log('### questionDeck '+JSON.stringify(questionDeck));
     //console.log('### questionDeck questions '+JSON.stringify(questionDeck.QC_Questions__r));
     //console.log('### questionDeck length '+JSON.stringify(questionDeck.QC_Questions__r.length));
     if(null != questionDeck){
         var random = Math.floor(Math.random() * questionDeck.QC_Questions__r.length);
         //console.log("### random value = "+ random);
         //console.log('### singleQuestion '+questionDeck.QC_Questions__r[random]);
         component.set("v.singleQuestion", questionDeck.QC_Questions__r[random]);
     }
     
 },

 submitAnswer : function(component, event, helper){
     let action = component.get("c.submitTheAnswer");
     
     var question = event.getSource().get("v.value");
     var qcInterviewId = component.get("v.qcInterviewId");
     var answer = component.get("v.answer");
     var score = component.get("v.score");
     
     console.log("#### question = "+ question);
     console.log("#### qcInterviewId = "+ qcInterviewId);
     console.log("#### answer = "+ answer);
     action.setParams({
         qcInterviewId : qcInterviewId,
         answer : answer,
         question : question,
         score : score
     });
     action.setCallback(this, function(response){
         let state = response.getState();
         console.log(state);
         if (state == "SUCCESS"){       
            console.log("#### success");
            /*var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Success!",
                "message": "The answer and score  has been updated successfully."
            });
            toastEvent.fire();*/
         }
         
         else if (state == "INCOMPLETE"){
             console.log(state);
         }

         else if (state == "ERROR"){
             console.log(state);
             var errors = response.getError();

             if (errors) {
                 if (errors[0] && errors[0].message){
                     console.log("Error message: " + errors[0].message);
                 }
             }
             else {
                 console.log("Unknown error");
             }
         }
     });

     $A.enqueueAction(action);
 }
})