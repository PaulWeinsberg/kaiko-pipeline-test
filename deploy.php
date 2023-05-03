<?php
namespace Deployer;
require 'recipe/common.php';
require __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;
use Ovh\Api;

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
    ->set('deploy_path', '{{application}}')
    ->set('node_env', 'dev')
    ->set('ovh', false);

host('preprod-client')
    ->stage('preprod-client')
    ->port(43904)
    ->hostname('sshcloud.cluster024.hosting.ovh.net')
    ->identityFile('keys/preprod-client.key')
    ->user('kaikore')
    ->set('deploy_path', '~/www/institutional')
    ->set('node_env', 'production')
    ->set('ovh', true)
    ->set('ovh_restart_service_name', 'kaikore.cluster024.hosting.ovh.net')
    ->set('ovh_restart_domain', 'institutional.kaiko.xyz');

/** TASKS **/
// Permet d'installer les packages
task('deploy:npm_install', function () {
    run('cd {{release_path}} && npm install');
});
// Permet de build la webapp
task('deploy:npm_nuxt_build', function () {
    $nodeEnv = get('node_env');
    run('cd {{release_path}} && NODE_ENV=' . $nodeEnv . ' npm run build --verbose');
});
// Permet de build localement la webapp
task('deploy:npm_nuxt_build_rsync', function () {
    runLocally('npm run build');
});
// Permet de déployer la webapp en RSync
task('deploy:rsync', function () {
    upload('/Applications/MAMP/htdocs/22KAI001/spininteractive-institutionalwebsite/', '{{release_path}}', [
        'options' => [
            "--exclude='keys'",
            "--exclude='.nuxt'",
            "--exclude='node_modules'",
            "--exclude='vendor'",
            "--exclude='.env'",
        ]
    ]);
    upload('/Applications/MAMP/htdocs/22KAI001/spininteractive-institutionalwebsite/.nuxt/', '{{release_path}}/.nuxt');
    upload('/Applications/MAMP/htdocs/22KAI001/spininteractive-institutionalwebsite/node_modules/', '{{release_path}}/node_modules');
});
// Permet de charger les variables du .env
task('deploy:dotenv', function() {
    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->safeLoad();
});
// Permet de redémarrer OVH
task('deploy:restart_ovh', function () {
    $isOvh = get('ovh');
    if ($isOvh) {
        $ovh = new Api($_ENV['OVH_APP_KEY'], $_ENV['OVH_APP_SECRET'], $_ENV['OVH_API_ENDPOINT'], $_ENV['OVH_CONSUMER_KEY']);
        $ovhRestartServiceName = get('ovh_restart_service_name');
        $ovhRestartDomain = get('ovh_restart_domain');
        $ovh->post('/hosting/web/' . $ovhRestartServiceName . '/attachedDomain/' . $ovhRestartDomain . '/restart');
    }
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
])->onStage(['test', 'preprod']);

desc('Deploy your project RSync');
task('rsync', [
    'deploy:npm_nuxt_build_rsync',
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:rsync',
    'deploy:shared',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'success',
    'deploy:restart_ovh',
])->onStage(['preprod-client', 'prod']);

desc('Allow to restart OVH');

before('deploy:restart_ovh', 'deploy:dotenv');

task('restart', [
    'deploy:restart_ovh',
]);

// If deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');
