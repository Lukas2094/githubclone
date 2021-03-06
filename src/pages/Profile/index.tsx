import React, { useEffect , useState} from 'react';
import { useParams } from 'react-router-dom';

import { Container ,Main , LeftSide , RightSide , Repos , CalendarHeading , RepoIcon ,Tab} from './styles';

import ProfileData from '../../components/ProfileData';
import ReporCard from '../../components/RepoCard';
import RandomCalendar from '../../components/RandomCalendar';
import { APIUser ,APIRepo} from '../../@types';

interface Data {
  user?: APIUser;
  repos?:APIRepo[];
  error?:string;
}

const Profile: React.FC = () => {

  const { username = 'guilhermerodz'} = useParams();
  const [data , setData] = useState<Data>();

  useEffect(() => {
     Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos`),
     ]).then(async (responses) => {
       const [userResponse , reposResponse] = responses;

       if(userResponse.status === 404) {
         setData({ error: 'User not found!' })
         return;
       }

       const user = await userResponse.json();
       const repos = await reposResponse.json();

       const shuffledrepos = repos.sort(() => 0.50 - Math.random());
       const slicedRepos = shuffledrepos.slice(0, 6);

       setData({
         user,
         repos: slicedRepos,
       });

      });
  },[username]);

  if(data?.error) {
    return <h1>{data.error}</h1>
  }

  if (!data?.user || !data?.repos) {
    return <h1>Loading.....</h1>
  }


  const TabContent = () => (
      <div className="content">
           <RepoIcon />
           <span className="label">Repositores</span>
           <span className="number">{data.user?.public_repos}</span>
        </div>
  );


  return (
    <Container>
        <Tab className="desktop"> 
        <div className="wrapper">
          <span className="offset" />
             <TabContent /> 
        </div>
             <span className="line" /> 
        </Tab>

        <Main>
           <LeftSide>
              <ProfileData 
                username={data.user.login}
                name={data.user.name}
                avatarUrl={data.user.avatar_url}
                followers={data.user.followers}
                following={data.user.following} 
                company={data.user.company}
                location={data.user.location}
                email={data.user.email}
                blog={data.user.blog}
              />
           </LeftSide>
           <RightSide>

             <Tab className=",obile">
                 {/* <TabContent /> */}
                 <span className="line"></span>
             </Tab>

             <Repos>
                <h2><b>Random repos</b></h2>

                <div>
                    {data.repos.map((item) => (
                      <ReporCard 
                      key={item.name}
                      username={item.owner.login}
                      reponame={item.name}
                      description={item.description}
                      language={item.language}
                      stars={item.stargazers_count}
                      forks={item.forks}
                      
                      
                      />
                    ))}
                    
                </div>
             </Repos>
           
             <CalendarHeading>
                 Random calendar (do not represent actual data)
             </CalendarHeading>

             <RandomCalendar />
           </RightSide>
        </Main>
    </Container>
  );
}

export default Profile;