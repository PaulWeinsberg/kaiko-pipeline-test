<?php
namespace Deployer;
require 'recipe/common.php';

// Project name
set('application', '~/www/22KAI001_WEBAPP');

// Project repository
set('repository', 'git@github.com.22KAI001_WEBAPP:spininteractive/22KAI001_WEBAPP.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', false);

// Shared files/dirs between deploys
set('shared_files', ['.env']);
set('shared_dirs', ['assets/fonts/icons/_source']);

// Writable dirs by web server
set('allow_anonymous_stats', false);
set('keep_releases', 2);
set('ssh_multiplexing', true);

// Hosts
host('test')
    ->stage('test')
    ->hostname('ssh-kaiko-test.alwaysdata.net')
    ->user('kaiko-test')
    ->identityFile('keys/test.key')
    ->set('branch', 'test')
    ->set('deploy_path', '{{application}}');

host('preprod')
    ->stage('preprod')
    ->hostname('ssh-kaiko-preprod-institutional.alwaysdata.net')
    ->user('kaiko-preprod-institutional')
    ->identityFile('keys/preprod.key')
    ->set('branch', 'preprod')
    ->set('deploy_path', '{{application}}');

host('prod')
    ->stage('prod')
    ->hostname('ssh-kaiko-prod-institutional.alwaysdata.net')
    ->identityFile('keys/prod.key')
    ->user('kaiko-prod-institutional')
    ->set('branch', 'main')
    ->set('deploy_path', '{{application}}');

// Tasks
// Permet d'installer les packages
task('deploy:npm_install', function () {
    run('cd {{release_path}} && npm install');
});

// Permet de build la webapp
task('deploy:npm_nuxt_build', function () {
    run('cd {{release_path}} && npm run build');
});

// DEPLOYMENT TASKS
desc('Deploy your project');
task('deploy', [
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:npm_install',
    'deploy:npm_nuxt_build',
    'deploy:writable',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'success'
]);

// If deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');
