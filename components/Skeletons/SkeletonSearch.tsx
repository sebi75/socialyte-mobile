import SkeletonContent from "react-native-skeleton-content"
import { Dimensions } from "react-native"

import { RootState } from "../../state/store"
import { useSelector } from "react-redux"

interface SkeletonProps {
  children: React.ReactNode
}
const { width } = Dimensions.get("window")
const Placeholder: React.FC<SkeletonProps> = ({ children }) => {
  const { isLoading } = useSelector((state: RootState) => state.searchUsers)
  return (
    <SkeletonContent
      containerStyle={{
        flex: 1,
        alignItems: "center",
        padding: 5,
      }}
      isLoading={isLoading}
      animationType="pulse"
      boneColor="#121212"
      highlightColor="#333333"
      layout={[
        {
          key: "1",
          width: width * 0.3,
          height: 13,
          marginBottom: 6,
          marginTop: 6,
        },
        { key: "2", width: width * 0.7, height: 13, marginBottom: 6 },
        {
          key: "3",
          width: width * 0.3,
          height: 13,
          marginTop: 13,
          marginBottom: 6,
        },
        { key: "4", width: width * 0.7, height: 11, marginBottom: 6 },
        {
          key: "5",
          width: width * 0.3,
          height: 13,
          marginTop: 13,
          marginBottom: 6,
        },
        { key: "6", width: width * 0.7, height: 11, marginBottom: 6 },
        {
          key: "7",
          width: width * 0.3,
          height: 13,
          marginTop: 10,
          marginBottom: 6,
        },
        { key: "8", width: width * 0.7, height: 13, marginBottom: 6 },
        {
          key: "9",
          width: width * 0.3,
          height: 13,
          marginTop: 13,
          marginBottom: 6,
        },
        { key: "10", width: width * 0.7, height: 11, marginBottom: 6 },
        {
          key: "11",
          width: width * 0.3,
          height: 13,
          marginTop: 13,
          marginBottom: 6,
        },
        { key: "12", width: width * 0.7, height: 11, marginBottom: 6 },
        {
          key: "13",
          width: width * 0.3,
          height: 13,
          marginTop: 13,
          marginBottom: 6,
        },
        { key: "14", width: width * 0.7, height: 11, marginBottom: 6 },
        {
          key: "15",
          width: width * 0.3,
          height: 13,
          marginTop: 13,
          marginBottom: 6,
        },
        { key: "16", width: width * 0.7, height: 11, marginBottom: 6 },
        {
          key: "17",
          width: width * 0.3,
          height: 13,
          marginTop: 13,
          marginBottom: 6,
        },
        { key: "18", width: width * 0.7, height: 11, marginBottom: 6 },
      ]}
    >
      {children}
    </SkeletonContent>
  )
}

export default Placeholder
