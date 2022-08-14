import { atom } from "recoil"

export const isDarkAtom = atom({
    key : "isDark",
    default : true, //기본값 덕분에 TypeScript가 이 값이 boolean인 것을 안다.
}) //atom은 두 가지를 요구한다. 첫번째로는 key 두번째로는 기본값이 필요하다