import { ApplicationService } from '#src/service/application';
import { ConfigController } from '#src/controller/config';

const appConfigFiles = ['src/config/application.yaml', 'config/application.yaml'];

ApplicationService.run(ConfigController.get(appConfigFiles));
