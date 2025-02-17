import "./Home.page.scss"
import NoDataIllustration from "@fider/assets/images/undraw-no-data.svg"

import React, { useState } from "react"
import { Post, Tag } from "@fider/models"
import { Markdown, Hint, Icon, Header } from "@fider/components"
import { SimilarPosts } from "./components/SimilarPosts"
import { PostInput } from "./components/PostInput"
import { PostsContainer } from "./components/PostsContainer"
import { useFider } from "@fider/hooks"
import { VStack } from "@fider/components/layout"

import { i18n } from "@lingui/core"
import { Trans } from "@lingui/react/macro"

export interface HomePageProps {
  posts: Post[]
  tags: Tag[]
  // countPerStatus: { [key: string]: number }
}

export interface HomePageState {
  title: string
}

const Lonely = () => {
  const fider = useFider()

  return (
    <div className="text-center">
      <Hint permanentCloseKey="at-least-3-posts" condition={fider.session.isAuthenticated && fider.session.user.isAdministrator}>
        <p>
          <Trans id="home.lonely.suggestion">
            It&apos;s recommended that you create <strong>at least 3</strong> suggestions here before sharing this site. The initial content is important to
            start engaging your audience.
          </Trans>
        </p>
      </Hint>
      <Icon sprite={NoDataIllustration} height="120" className="mt-6 mb-2" />
      <p className="text-muted">
        <Trans id="home.lonely.text">No posts have been created yet.</Trans>
      </p>
    </div>
  )
}

const HomePage = (props: HomePageProps) => {
  const fider = useFider()
  const [title, setTitle] = useState("")

  const defaultWelcomeMessage = i18n._("home.form.defaultwelcomemessage", {
    message: `We'd love to hear what you're thinking about.

What can we do better? This is the place for you to vote, discuss and share ideas.`,
  })

  const defaultInvitation = i18n._("home.form.defaultinvitation", {
    message: "Enter your suggestion here...",
  })

  const isLonely = () => {
    // const len = Object.keys(props.countPerStatus).length
    // if (len === 0) {
    //   return true
    // }

    // if (len === 1 && PostStatus.Deleted.value in props.countPerStatus) {
    //   return true
    // }

    return false
  }

  return (
    <>
      <Header />
      <div id="p-home" className="page container">
        <div className="p-home__welcome-col">
          <VStack spacing={2} className="p-4">
            <Markdown text={fider.session.tenant.welcomeMessage || defaultWelcomeMessage} style="full" />
            <PostInput placeholder={fider.session.tenant.invitation || defaultInvitation} onTitleChanged={setTitle} />
          </VStack>
        </div>
        <div className="p-home__posts-col p-4">
          {isLonely() ? (
            <Lonely />
          ) : title ? (
            <SimilarPosts title={title} tags={props.tags} />
          ) : (
            <PostsContainer posts={props.posts} tags={props.tags} />
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage
