import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import { randomWord } from 'dummy/utils';

function simulateResponse(shouldSucceed) {
  if (shouldSucceed) {
    return timeout(1000).then(() => ({ result: 123 }));
  } else {
    return timeout(1000).then(() => {
      throw new Error("Network Error");
    });
  }
}

import { omgErrorSymbol } from 'omg-errors';

// BEGIN-SNIPPET exp-backoff-controller
export default Ember.Controller.extend({
  currentError: null,

  submitForm: task(function * (ev) {
    ev.preventDefault();

    let failures = 4;
    while (true) {
      console.log("WAT");
      try {
      } catch(e) {
        yield simulateResponse(failures === 0);


        yield handleError(promise)
      }
    }

  }),






























  parentTask: task(function * () {

    // 1. wrap the perform
    yield handlesErrors(otherTask.perform());


    //yield this.get("childTask").perform().catch(handleOmgError, handleLameError);


    let successValue =
      yield this.get("childTask").perform().catch(handleOmgError, handleLameError);

    // 2.
  }).handles(somePatternMatchingFunciton, someSymbolonTaggedError),

  childTask: task(function * () {
    //let error = new Error("lame");
    //error[handleLameError] = true;
    //throw error;
  }),

  grandchildTask: task(function * () {
    let error = new Error("lame");
    error[handleLameError] = true;
    throw error;
  }),

  [handleOmgError]: task(function * () {
    return {
      success: false,
      message: "there was an omg error",
    };
  }).catch(isAnErrorIHandle),

  [handleLameError]: task(function * () {
    throw {
      success: false,
      message: "there was an omg error",
    };
  }),




  submitForm: task(function * (model) {
    yield handleError(isAnErrorIHandle, model.save());
  }),

});
// END-SNIPPET

function isAnErrorIHandle(e) {
  if (!e) return something;

  //return jasdkdjadkjasdkjkajsdkajsdkjasdkjasdkjasde



  return {
  };

}





//- unhandled error
//- handler error, replaced w success
//- unhandled non-fatal error

// the typo case:
//
//


// model.save()
//
// if you only want to catch that error, have to put



/*
    currentNum: 0,
    pollForUpdates: task(function * () {
      while (true) {
        // TODO: handle errors
        let value = yield getAjaxNum(this.get('url'));
        this.set('currentNum', value);
        yield timeout(2000);
      }
    }).observes('url').on('init').restartable(),


    function stream(...args) {
    }



    currentNum: 0,
    pollForUpdates: task(function * () {
      while (true) {
        // TODO: handle errors
        let value = yield getAjaxNum();
        this.set('currentNum', value);
        yield timeout(2000);
      }
    }).on('didInsertElement'),

    currentNum: stream(function * () {
        let value = yield getAjaxNum();
        publish(value);
        yield timeout(2000);
    }),

    currentNum: stream('host', function * () {
      let value = yield $.ajax(this.get('host'));
      publish(value);
      yield timeout(2000);
    }),

    regenerate() {
      return apiRequest("asd")
               .then(() => {
               })
    }

   */






