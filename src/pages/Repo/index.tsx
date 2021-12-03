import React from 'react';
import { Link } from 'react-router-dom';
import { Container , 
  Breakcrumb, 
  RepoIcon, 
  Stats , 
  LInkButton, 
  GithubIcon, 
  ForkIcon, 
  StarIcon} from './styles';

const Repo: React.FC = () => {
  return (
      <Container>
        <Breakcrumb>
           <RepoIcon />
           <Link className={'username'} to={'/lucassilva'}>
              Lucas silva
           </Link>

           <span>/</span>

           <Link className={'reponame'} to={'/lucassilva/youtube-content'}>
               youtube-content
             </Link> 
        </Breakcrumb>

          <p>Contains all of my Youtube lessons code.</p>

          <Stats>
            <li>
              <StarIcon />
              <b>6</b>

              <span>Stars</span>
            </li>

            <li>
              <ForkIcon />
              <b>0</b>
              <span>Forks</span>
            </li>
          </Stats>

          <LInkButton href={'https://github.com/lucassilva/youtube-content'}>
             <GithubIcon />
             <span>View on GitHub</span>
          </LInkButton>
      </Container>
  );
}

export default Repo;