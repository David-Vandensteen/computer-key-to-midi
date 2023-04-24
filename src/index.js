import { argService } from '#src/service/arg';
import { ApplicationService } from '#src/service/application';
import { ConfigManager } from '#src/manager/config';

// TODO try catch throw error
argService.checkArgumentsAndHelp();

ApplicationService.run(
  ConfigManager.get([
    'src/config/application.yaml',
    'config/application.yaml']),
);
