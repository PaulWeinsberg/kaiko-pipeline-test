<?php
namespace Deployer;
require 'recipe/common.php';

set('application', '~/www/22KAI001_WEBAPP');

set('repository', 'git@github.com.spininteractive-institutionalwebsite:kaikodata/spininteractive-institutionalwebsite.git');
set('git_tty', false);
set('shared_files', ['.env']);
set('shared_dirs', ['assets/fonts/icons/_source']);
set('allow_anonymous_stats', false);
set('keep_releases', 2);
set('ssh_multiplexing', false);

// Hosts
host('test')
    ->stage('test')
    ->hostname('ssh-kaiko-test.alwaysdata.net')
    ->identityFile('keys/test.key')
    ->user('kaiko-test')
    ->set('branch', 'test')
    ->set('deploy_path', '{{application}}');

// Tasks
task('deploy:npm_install', function () {
    run('cd {{release_path}} && npm install');
});

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
    'deploy:writable',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:npm_install',
    'deploy:npm_nuxt_build',
    'deploy:unlock',
    'cleanup',
    'success'
]);

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');
