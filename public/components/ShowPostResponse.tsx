import React from "react"
import { PostResponse } from "@fider/models"
import { Markdown } from "@fider/components"
// import HeroIconDuplicate from "@fider/assets/images/heroicons-duplicate.svg"
// import HeroIconCheck from "@fider/assets/images/heroicons-check-circle.svg"
// import HeroIconSparkles from "@fider/assets/images/heroicons-sparkles-outline.svg"
// import HeroIconThumbsUp from "@fider/assets/images/heroicons-thumbsup.svg"
// import HeroIconThumbsDown from "@fider/assets/images/heroicons-thumbsdown.svg"
import { VStack } from "./layout"
import { timeSince } from "@fider/services"

interface PostResponseProps {
  // status: string
  response: PostResponse | null
  small?: boolean
}

export const ResponseDetails = (props: PostResponseProps): JSX.Element | null => {
  // const status = PostStatus.Get(props.status)

  if (!props.response) {
    return null
  }

  return (
    <VStack align="start" spacing={4} className="bg-blue-50 p-3 border border-blue-200 rounded">
      <ResponseLozenge response={props.response} />
      <div className="text-semibold text-lg">{timeSince("en", new Date(), props.response.respondedAt, "date")}</div>
      {props.response?.text && (
        <div className="content">
          <Markdown text={props.response.text} style="full" />
        </div>
      )}
    </VStack>
  )
}

// const getLozengeProps = (): { icon: SpriteSymbol; bg: string; color: string; border: string } => {
//   return { icon: HeroIconSparkles, bg: "bg-green-100", color: "text-green-700", border: "border-green-400" }
// }

export const ResponseLozenge = (props: PostResponseProps): JSX.Element | null => {
  // const status = PostStatus.Get(props.status)
  // const { icon, bg, color, border } = getLozengeProps()

  return <div />
}
