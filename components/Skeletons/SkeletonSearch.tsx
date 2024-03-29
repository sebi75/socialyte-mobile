import React from "react"
import { Dimensions } from "react-native"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"

interface SkeletonProps {
  children: React.ReactNode
  isLoading: boolean
}
const { width, height } = Dimensions.get("window")

/* const Placeholder: React.FC<SkeletonProps> = ({ children, isLoading }) => {
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
} */

const Placeholder: React.FC<SkeletonProps> = ({ children, isLoading }) => {
  if (isLoading) {
    return (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          marginTop={7}
        >
          <SkeletonPlaceholder.Item
            width={width * 0.3}
            height={13}
            borderRadius={7}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.7}
            height={13}
            borderRadius={7}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.7}
            height={13}
            borderRadius={7}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          marginTop={7}
        >
          <SkeletonPlaceholder.Item
            width={width * 0.3}
            height={13}
            borderRadius={7}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.7}
            height={13}
            borderRadius={7}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.7}
            height={13}
            borderRadius={7}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          marginTop={7}
        >
          <SkeletonPlaceholder.Item
            width={width * 0.3}
            height={13}
            borderRadius={7}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.7}
            height={13}
            borderRadius={7}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.7}
            height={13}
            borderRadius={7}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          marginTop={7}
        >
          <SkeletonPlaceholder.Item
            width={width * 0.3}
            height={13}
            borderRadius={7}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.7}
            height={13}
            borderRadius={7}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.7}
            height={13}
            borderRadius={7}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          marginTop={7}
        >
          <SkeletonPlaceholder.Item
            width={width * 0.3}
            height={13}
            borderRadius={7}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.7}
            height={13}
            borderRadius={7}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.7}
            height={13}
            borderRadius={7}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          marginTop={7}
        >
          <SkeletonPlaceholder.Item
            width={width * 0.3}
            height={13}
            borderRadius={7}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.7}
            height={13}
            borderRadius={7}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.7}
            height={13}
            borderRadius={7}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    )
  }
  return <>{children}</>
}

{
  /* <SkeletonPlaceholder.Item
              width={120}
              height={20}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={80}
              height={20}
              borderRadius={4}
            /> */
}

export default Placeholder
