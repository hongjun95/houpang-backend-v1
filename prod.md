1. Pm2 설치 https://github.com/Unitech/pm2

   - sudo npm i pm2 -g
   - pm2 list
   - package.json 수정, .env MODE=‘prod’로 수정, PORT=80으로 수정
   - yarn run start:debug
   - yarn run build
   - yarn run start:prod
   - pm2 list
   - pm2 kill

2. github에 코드 올리기

   - https://github.com/amamov/gits
   - .env는 .gitignore에 추가해서 올리기
   - dist만 따로 빼서

3. VPS : 가상 사설 서버 구축

   - AWS Lightsail 사용
   - 인스턴스 생성
   - ssh를 사용하여 연결
   - sudo apt-get update
   - sudo apt-get -y upgrade
   - sudo apt-get install build-essential
   - sudo apt-get install curl
   - curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash --
   - sudo apt-get install -y nodejs
   - sudo apt-get install git
   - sudo apt-get install vim
   - touch .gitconfig
   - git config --global user.name amamov
   - git config --global user.email amamov@kakao.com
   - git config --global --list
   - git clone <프로젝트>
   - cd <프로젝트>
   - npm i
   - sudo npm i -g @nestjs/cli
   - sudo npm i -g pm2
   - vi .env (환경변수 붙여 넣기)
   - sudo npm run start:prod

4. 고정 퍼블릭 주소 할당받기
