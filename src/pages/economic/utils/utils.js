import * as constants from "@/pages/economic/constants";

/* DataSet view数据更新*/
export function SyncView(view, data) {
  try {
    constants.DATA_SET.createView(view).source(data)
  } catch (_) {
    constants.DATA_SET.getView(view).source(data)
  }
  return constants.DATA_SET.getView(view)
}
