// import { useEffect } from 'react';
// // shared
// import { SplashScreen } from 'src/shared/components/loading-screen';
// // core
// import { useAuth } from 'src/core/auth/hooks/use-auth';
// // context
// import { setSession as setApiSession } from 'src/services/rest-api/app-api/api-instance';
// //
// import { AuthProvider } from '../context/next-auth/provider';

// // ----------------------------------------------------------------------

// type Props = {
//   children: React.ReactNode;
// };

// function AuthGuardInner({ children }: Props) {
//   const { data: session, login, status } = useAuth();

//   useEffect(() => {
//     if (
//       status !== 'loading' &&
//       ((session && session?.error === 'RefreshAccessTokenError') || !session)
//     ) {
//       login();
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [session, status]);

//   if (status === 'loading' || status === 'unauthenticated') {
//     return <SplashScreen />;
//   }

//   setApiSession(session?.accessToken ?? '');

//   return <>{children}</>;
// }

// export default function AuthGuard({ children }: Props) {
//   return (
//     <AuthProvider>
//       <AuthGuardInner>{children}</AuthGuardInner>
//     </AuthProvider>
//   );
// }
