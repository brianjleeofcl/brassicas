import {Store, Dispatch, Action} from 'redux';
import {State} from './state';
import {PRESELECT, SELECT, UNSELECT, ADD_SELECTED, SUB_SELECTED, INACTIVATE, ADD_SCORE, DISPLAY, REVERT, INCORRECT, SHUFFLE} from './constants';
import {selectAction, unselectAction} from './actions';

export default [
  function middleware1({dispatch, getState}: Store<State>) {
    return function(next: Dispatch<Action>): (action: Action) => void {
      return function(action: Action) {
        if (action.type === PRESELECT) {
          const {code} = action as selectAction;
          const selected = getState().selected
          if (selected === null) {
            next({type: SELECT, code});
            return next({type: ADD_SELECTED, code});
          }
          else {

            const selection: string = getState()[selected].brassica
            const current: string = getState()[code].brassica 

            next({type: DISPLAY, code})
            next({type: DISPLAY, code: selected})

            setTimeout(() => {
              if (selection === current) {
                next({type: INACTIVATE, code})
                next({type: INACTIVATE, code: selected})
              } 
              else {
                next({type: INCORRECT, code})
                next({type: INCORRECT, code: selected});
                setTimeout(() => {
                  next({type: REVERT, code})
                  next({type: REVERT, code: selected})

                  next({type: ADD_SCORE, amount: 2})
                  
                  if (getState()[selected].isJoker || getState()[code].isJoker) {
                    next({type: 'activate joker'})
                  }
                }, 1000);
              }
              return next({type: SUB_SELECTED});
            }, 1000)
          }
        }
        if (action.type === UNSELECT) {
          const { code } = action as unselectAction;
          dispatch({type: SELECT, code});
          return next({type: SUB_SELECTED});
        }

        return next(action);
      }
    }
  },
  function middleware2({dispatch, getState}: Store<State>) {
    return function(next: Dispatch<Action>): (action: Action) => void {
      return function(action: Action) {
        if (action.type === 'activate joker') {
          const remaining: string[] = [];
          const blanks = getState().board.order.map((str: string) => {
            if (getState()[str].isActive) {
              remaining.push(str);
              return null;
            } 
            else {
              return str;
            }
          })

          return next({type: SHUFFLE, blanks, remaining})
        }

        return next(action)
      }
    }
  }
]
