const FORM_UPDATE = "FORM_UPDATE"

export default (state: any, action: any) => {
  switch (action.type) {
    case FORM_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.inputId]: action.value,
      }

      const updatedValidities = {
        ...state.inputValidities,
        [action.inputId]: action.isValid,
      }

      let updateIsFormValid = true
      for (const key in updatedValidities) {
        updateIsFormValid = updateIsFormValid && updatedValidities[key]
      }
      return {
        isFormValid: updateIsFormValid,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
      }

    default:
      state
  }
}
