exports.validateProjectName = (projectName) => {
  if (!projectName) return "프로젝트 이름을 입력해주세요.";
  if (projectName.length < 2 || projectName.length > 20)
    return "프로젝트 이름은 2자 이상, 20자 이내로 입력해주세요.";
  if (!/^[A-Za-z0-9가-힣]+$/.test(projectName))
    return "영문자(대소문자), 숫자, 한글만 사용할 수 있습니다.";

  return null;
};
