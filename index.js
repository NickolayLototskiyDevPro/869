const ProjectModule = (function ProjectModule() {
  let instance;
  function project() {
    return {
      participants: [],
      pricing: {},
      isBusy: false,
      init(participants, pricing) {
        if (typeof participants === 'object' || typeof pricing === 'object') {
          if (participants !== null || pricing !== null) {
            // this.participants = JSON.parse(JSON.stringify(participants));
            this.participants = [...participants];
            this.pricing = JSON.parse(JSON.stringify(pricing));
          }
        }
      },
      findParticipant(functor, callbackFunction) {
        if (this.isBusy === true) {
          return false;
        }
        this.isBusy = true;
        let element;
        let result;
        setTimeout(() => {
          for (let i = 0; i < this.participants.length; i++) {
            if (functor(this.participants[i])) {
              element = this.participants[i];
              break;
            }
          }

          if (element) {
            result = callbackFunction(element);
            this.isBusy = false;
          }
          this.isBusy = false;
          callbackFunction(null);
        });
      },
      findParticipants(functor, callbackFunction) {
        if (this.isBusy === true) {
          return false;
        }
        this.isBusy = true;
        const elements = [];
        setTimeout(() => {
          for (let i = 0; i < this.participants.length; i++) {
            if (functor(this.participants[i])) {
              elements.push(this.participants[i]);
            }
          }
          if (elements.length !== 0) {
            this.isBusy = false;
            callbackFunction(elements);
          }
          this.isBusy = false;
          callbackFunction(elements);
        });
      },
      addParticipant(participantObject, callbackFunction) {
        if (this.isBusy === true) {
          return false;
        }
        this.isBusy = true;
        let check = false;
        let key = Object.keys(participantObject);
        setTimeout(() => {
          for (let i = 0; i < key.length; i++) {
            if (key[i] === 'seniorityLevel') {
              check = true;
            }
          }
          if (check) {
            this.isBusy = false;
            this.participants.push(participantObject);
            callbackFunction();
          }
          this.isBusy = false;
          callbackFunction(new Error());
        });
      },
      removeParticipant(participantObject, callbackFunction) {
        if (this.isBusy === true) {
          return false;
        }
        this.isBusy = true;
        let array = [];
        // let prin = JSON.stringify(participantObject);
        let check = false;
        let result;
        setTimeout(() => {
          for (let i = 0; i < this.participants.length; i++) {
            array.push(this.participants[i]);
          }
          for (let i = 0; i < array.length; i++) {
            if (array[i] === participantObject) {
              check = `${i}`;
            }
          }
          if (check) {
            check = +check;
            result = this.participants.splice(check, 1);
            this.isBusy = false;
            result = result[0];

            callbackFunction(result);
          }
          this.isBusy = false;
          callbackFunction(null);
        });
      },

      calculateSalary(periodInDays) {
        let ours = periodInDays * 8;
        let keyParticipant = [];
        let salary = 0;
        let keyPricing = Object.keys(this.pricing);
        for (let i = 0; i < this.participants.length; i++) {
          if (this.participants[i]['seniorityLevel'])
            keyParticipant.push(this.participants[i]['seniorityLevel']);
        }
        for (let i = 0; i < keyParticipant.length; i++) {
          for (let j = 0; j < keyPricing.length; j++) {
            if (keyParticipant[i] === keyPricing[j]) {
              salary += ours * this.pricing[keyPricing[j]];
              //del partic
              keyParticipant.splice(i, 1);
              i--;
              break;
            }
          }

          // if (keyParticipant[i] === keyPricing[keyParticipant[i]]) {
          //   salary = ours * keyPricing[;
          //del partic
        }
        if (salary > 0 && keyParticipant.length === 0) return salary;
        throw new Error("pricing wan't found");
      },
      setPricing(participantPriceObject, callbackFunction) {
        if (this.isBusy === true) {
          return false;
        }
        this.isBusy = true;
        let truly = true;
        let inputKey = Object.keys(participantPriceObject);
        let pricKey = Object.keys(this.pricing);
        setTimeout(() => {
          for (let i = 0; i < pricKey.length; i++) {
            if (pricKey[i] === inputKey) {
              this.pricing[pricKey[i]] = participantPriceObject[inputKey];
              truly = false;
            }
          }
          if (truly) {
            this.pricing[inputKey] = participantPriceObject[inputKey];
          }
          this.isBusy = true;
          callbackFunction();
        });
      },
    };
  }

  return {
    getInstance() {
      if (!instance) {
        instance = project();
      }
      return instance;
    },
  };
})();

module.exports = {
  firstName: 'Nikita',
  secondName: 'Koptsov',
  task: ProjectModule.getInstance(),
};
