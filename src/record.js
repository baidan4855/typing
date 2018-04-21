import { Observable } from "rxjs";
import { getDiff } from "./utils";

const getTextChange = ele => {
  const input$ = Observable.fromEvent(ele, "input");
  const select$ = Observable.fromEvent(ele, "select").map(x => ({
    target: x.target,
    inputType: "corsorMove"
  }));
  const mouseup$ = Observable.fromEvent(ele, "mouseup").map(x => ({
    target: x.target,
    inputType: "corsorMove"
  }));
  const keyUp$ = Observable.fromEvent(ele, "keyup")
    .filter(({ keyCode }) => keyCode >= 37 && keyCode <= 40)
    .map(x => ({
      target: x.target,
      inputType: "corsorMove"
    }));
  const changes$ = Observable.merge(input$, select$, mouseup$, keyUp$)
    .map(x => {
      const { data, inputType, target } = x;
      return {
        selection: { start: target.selectionStart, end: target.selectionEnd },
        value: target.value,
        inputType,
        data,
        at: Date.now()
      };
    })

    .scan(
      (acc, curr) => {
        const prev = acc.prev;
        let change = {
          selection: prev ? prev.selection : { start: 0, end: 0 },
          interval: prev ? curr.at - prev.at : 0,
          to: curr.data
        };
        switch (curr.inputType) {
          case "insertText":
          case "deleteContentBackward":
          case "deleteContentForward":
          case "insertFromPaste":
          case "deleteByCut":
          case "historyUndo":
          case "historyRedo":
          case "insertCompositionText":
            change = { ...change, ...getDiff(prev.value, curr.value) };
            break;
          default:
        }
        return {
          prev: curr,
          change
        };
      },
      {
        prev: null,
        change: {
          selection: { start: 0, end: 0 },
          interval: 0,
          to: ""
        }
      }
    )
    .pluck("change");
  return changes$;
};

export default getTextChange;
