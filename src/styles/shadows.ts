import * as Colors from './colors'

export const base = {
  shadowColor: Colors.black,
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,

  elevation: 2
}

export const md = {
  shadowColor: Colors.black,
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4
}

export const lg = {
  shadowColor: Colors.black,
  shadowOffset: {
    width: 0,
    height: 4
  },
  shadowOpacity: 0.3,
  shadowRadius: 4.65,

  elevation: 8
}

export const xl = {
  shadowColor: Colors.black,
  shadowOffset: {
    width: 0,
    height: 8
  },
  shadowOpacity: 0.44,
  shadowRadius: 10.32,

  elevation: 16
}

export const inset = {
  shadowColor: Colors.black,
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  borderWidth: 5,
  borderColor: Colors.white
}
