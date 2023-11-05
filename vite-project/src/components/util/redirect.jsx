// export const RedirectYourStory = ({ url, splashPageUrl }) => {
//     useEffect(() => {
//       const redirect = () => {
//         const a = document.createElement('a');
//         a.href = url;
//         a.target = '_blank';
//         a.click();

//         setTimeout(() => {
//           window.location.href = splashPageUrl;
//         }, 2000)
//       };

//       const timeout = setTimeout(redirect, 1000)

//       return () => clearTimeout(timeout)
//     }, [url, splashPageUrl]);

//     return (<div className="redirecting">Redirecting...</div>)