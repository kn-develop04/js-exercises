function counter() {
  let n = 0;
  return {
    count: function () {
      return n++;
    },
    reset: function () {
      n = 0;
    },
    getCount: function () {
      return n;
    },
  };
}

export function counterGroup() {
  let counters = [];

  function newCounter() {
    const newC = counter();
    counters.push(newC);
    return {
      count: function () {
        return newC.count();
      },
      reset: function () {
        newC.reset();
      },
      getCount: function () {
        return newC.getCount();
      },
    };
  }

  function total() {
    return counters.reduce((acc, counter) => acc + counter.getCount(), 0);
  }

  function average() {
    if (counters.length === 0) {
      throw new TypeError();
    }

    const sum = counters.reduce((acc, counter) => acc + counter.getCount(), 0);
    return sum / counters.length;
  }

  function variance() {
    if (counters.length < 2) {
      throw new TypeError();
    }

    const avg = average();

    const sumOfSquares = counters.reduce((acc, counter) => {
      const count = counter.getCount();
      return acc + Math.pow(count - avg, 2);
    }, 0);

    return sumOfSquares / counters.length;
  }

  return {
    newCounter,
    total,
    average,
    variance,
  };
}
