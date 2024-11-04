import CredentialsProvider  from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"

export const NEXT_AUTH = {
    providers:[
        CredentialsProvider({
            name: "Email",
            credentials: {
                username: { label: 'Email', type: 'text', placeholder: 'Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' },
            },
            async authorize(credentials:any) {
                const name = credentials.username;
                    return {
                        id:'user1',
                        name:name,
                        email:'harkirat@gmail.com'
                    }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID||'',
            clientSecret: process.env.GOOGLE_SECRET||''
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{

        session: ({session,token,user}:any) =>{
            session.user.id= token.sub;
            return session;
        }
        
    }
}