import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface SignInNotificationEmailProps {
  username?: string;
  deviceDetails?: any;
}


export const SignInNotificationEmail = ({
  username,deviceDetails
}: SignInNotificationEmailProps) => (
  <Html>
    <Head>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron&display=swap');
        `}
      </style>
    </Head>
    <Body style={main}>
      <Preview>
        Sign In Succesful
      </Preview>
      <Container style={container}>
        
        <Text style={text_logo}>
          KAAAJ Advertising
        </Text>

        <Section style={section}>
          <Text style={text}>
            Hi <strong>{username}</strong>!
          </Text>
          <Text style={text}>
            We noticed a login to your account from a new device:
          </Text>

          <Text style={text}>
            <strong>Device:</strong> {deviceDetails.device_type} <br />
            <strong>OS/Browser:</strong> {deviceDetails.user_agent} <br />
            <strong>Location:</strong> Test Value <br />
            <strong>Time</strong> Date and Time, including time zone
          </Text>

          <Text style={text}>If this was you, no action is needed.</Text>

          <Text style={text}>
            If you don’t recognize this activity, please secure your account immediately by resetting your password or <br />
            contacting our support team. <br />
            Your security is important to us.
          </Text>

        </Section>
        <Text style={links}>
          <Link style={link}>Your security audit log</Link> ・{' '}
          <Link style={link}>Contact support</Link>
        </Text>

        <Text style={footer}>
          KAAAJ Advertisement,・123 STREET NAME ・CITY, STATE ZIP
        </Text>
      </Container>
    </Body>
  </Html>
);

SignInNotificationEmail.PreviewProps = {
  username: 'John D',
} as SignInNotificationEmailProps;

export default SignInNotificationEmail;

const text_logo = {
  fontFamily: 'Orbitron, sans-serif',
  fontSize: '22px',
  margin: '50px 0px'
}
const main = {
  backgroundColor: '#ffffff',
  color: '#24292e',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: '480px',
  margin: '0 auto',
  padding: '20px 0 48px',
};


const section = {
  padding: '24px',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  textAlign: 'center' as const,
};

const text = {
  margin: '0 0 10px 0',
  textAlign: 'left' as const,
};


const links = {
  textAlign: 'center' as const,
};

const link = {
  color: '#0366d6',
  fontSize: '12px',
};

const footer = {
  color: '#6a737d',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '60px',
};
