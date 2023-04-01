const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case 'GOOD':
        let stateGood = { ...state }
        stateGood.good += 1
        return stateGood
      case 'OK':
        let stateOk = { ...state }
        stateOk.ok += 1
        return stateOk
      case 'BAD':
        let stateBad = { ...state }
        stateBad.bad += 1
        return stateBad
      case 'ZERO':
        let stateZero = { ...state }
        stateZero.good = 0
        stateZero.ok = 0
        stateZero.bad = 0
        return stateZero
    }
    return state
  }
  
  
  export default counterReducer