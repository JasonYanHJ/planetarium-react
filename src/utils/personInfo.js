function updatePersonInfo(info) {
  const toSaveInfo = {
    ...getPersonInfo(),
    ...info,
  };
  toSaveInfo.password = undefined; // TODO: 修改后端
  localStorage.setItem('person_info', JSON.stringify(toSaveInfo));
}

function getPersonInfo() {
  let info = localStorage.getItem('person_info');
  if (!info)
    return null;
  
  return JSON.parse(info);
}

function clearPersonInfo() {
  localStorage.removeItem('person_info');
}

export { updatePersonInfo, getPersonInfo, clearPersonInfo }