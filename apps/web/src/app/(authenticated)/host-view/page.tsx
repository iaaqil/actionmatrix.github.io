'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Avatar, Space, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HostViewPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [hostviews, setHostviews] = useState<Model.Hostview[]>([])

  useEffect(() => {
    if (userId) {
      Api.Hostview.findManyByUserId(userId, {
        includes: [
          'user',
          'user.journals',
          'user.goals',
          'user.habits',
          'user.hobbies',
          'user.schedules',
          'user.focusmodes',
        ],
      })
        .then(setHostviews)
        .catch(error => {
          enqueueSnackbar('Failed to fetch host views: ' + error.message, {
            variant: 'error',
          })
        })
    }
  }, [userId])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Host Dashboard</Title>
      <Text type="secondary">
        Manage and view user activities across different modules of the
        productivity journal app.
      </Text>
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {hostviews?.map(hostview => (
          <Col key={hostview.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={hostview.user?.name || 'Unknown User'}
              bordered={false}
              actions={[
                <Button
                  type="link"
                  onClick={() => router.push(`/journal/${hostview.id}`)}
                >
                  View Details
                </Button>,
              ]}
            >
              <Space direction="vertical">
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  src={hostview.user?.pictureUrl}
                />
                <Text>Email: {hostview.user?.email || 'No email'}</Text>
                <Text>View Type: {hostview.viewType || 'No view type'}</Text>
                <Text>
                  Date:{' '}
                  {hostview.viewDate
                    ? dayjs(hostview.viewDate).format('YYYY-MM-DD')
                    : 'No date'}
                </Text>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
